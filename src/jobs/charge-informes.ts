
import { prisma } from "@/lib/db"

import fs from 'fs';
import csv from 'csv-parser';
import { promisify } from 'util';
import stream from 'stream';

const pipeline = promisify(stream.pipeline);

//Region,Vintage,Style,Score,ABV%,Peso Price
interface TasteEntry {
  producerName: string;
  wineName: string;
  vintage: string;
  region: string;
  style: string;
  score: string;
  abv: string;
  pesoPrice: number;
}

async function processWineEntries(tasteEntries: TasteEntry[], tastingDate: Date): Promise<void> {
    console.log(`Procesando ${tasteEntries.length} tastings`)

    
    const producers = new Map<string, TasteEntry[]>()
  
    // Agrupar vinos por productor
    for (const taste of tasteEntries) {
      const producerWines = producers.get(taste.producerName) || []
      producerWines.push(taste)
      producers.set(taste.producerName, producerWines)
    }

    // Convertir el iterador del Map en un arreglo
    const producerEntries = Array.from(producers)
    console.log(`Procesando ${producerEntries.length} productores`)    
  
    for (const [producerName, tastings] of producerEntries) {
      try {

        console.log("\n")
        console.log("-> ", producerName)

        let dbProducer = await prisma.producer.findFirst({
          where: {
            name: producerName,
          },
        });

        if (!dbProducer) {
          console.log(`\t- creando productor no encontrado`)
          dbProducer = await prisma.producer.create({
            data: {
              name: producerName.trim(),
            },
          });
        }

        if (!dbProducer) {
          console.log(`\t- no encontrado`)
        }

        if (!dbProducer.id) {
          console.log(`producerId no encontrado`)
          throw new Error("producerId no encontrado")
        }

        for (const tasting of tastings) {
          //console.log(`- Vino: ${wine.wineName}, Añada: ${wine.vintage}, Región: ${wine.region}, ABV: ${wine.abv}, Precio: $${wine.pesoPrice}, estilo: ${wine.style}, score: ${wine.score}`);
  
          console.log("\t* ", tasting.wineName)
          let dbWine = await prisma.wine.findFirst({
            where: {
              name: tasting.wineName,
              producerId: dbProducer.id,
            },
          });

          if (!dbWine) {
            console.log(`\t\tcreando vino ${tasting.wineName}`);
            dbWine = await prisma.wine.create({
              data: {
                name: tasting.wineName,
                region: tasting.region,
                producer: {
                  connect: {
                    id: dbProducer.id,
                  },
                },
              },
            });
          }

          let tim2020Tasting = await prisma.tasting.findFirst({
            where: {
              taster: "Tim",
              wineId: dbWine.id,
              vintage: parseInt(tasting.vintage) || 0,
              tastingDate: tastingDate,
            },
          });

          if (!tim2020Tasting) {
            console.log(`\t\t\tcreando tasting para vino ${tasting.wineName}, añada ${tasting.vintage}`);

            tim2020Tasting = await prisma.tasting.create({
              data: {
                taster: "Tim",
                wineId: dbWine.id,
                vintage: parseInt(tasting.vintage) || 0,
                tastingDate: tastingDate,
                style: tasting.style,
                score: parseInt(tasting.score),
                abv: parseFloat(tasting.abv.replace(/,/g, '.')),
                pesoPrice: tasting.pesoPrice,              
              },
            })  
          }
  
        }
      } catch (error) {
        console.error(`Error procesando el productor ${producerName}: ${error}`);
      }
    }
  }

async function deleteAll() {
  await prisma.producer.deleteMany({});  
}

async function main() {
  // await deleteAll();
  // return
  let results: TasteEntry[] = await parsear('/home/raphael/Downloads/tasting_2024/informe_2020_modificado.csv')
  await processWineEntries(results, new Date("2020-02-01"))

  results= await parsear('/home/raphael/Downloads/tasting_2024/informe_2021_modificado.csv')
  await processWineEntries(results, new Date("2021-02-01"))

  results= await parsear('/home/raphael/Downloads/tasting_2024/informe_2023_modificado.csv')
  await processWineEntries(results, new Date("2023-02-01"))

}

async function parsear(path: string): Promise<TasteEntry[]> {

  const results: TasteEntry[] = [];

  await pipeline(
    fs.createReadStream(path),
    csv(),
    async function (source) {
      for await (const row of source) {
        //Region,Vintage,Style,Score,ABV%,Peso Price
        const entry: TasteEntry = {
          producerName: row['BODEGA'].trim(),
          wineName: row['ETIQUETA'].trim(),
          vintage: row['Vintage'].trim() || "0", 
          region: row['Region'].trim(),
          abv: row['ABV%'].trim(),
          style: row['Style'].trim(),
          score: row['Score'].trim(),
          pesoPrice: parseFloat(row['Peso Price'].trim().replace(/,/g, '.')),
        };
        results.push(entry);
      }
    }
  );

  return results

  
}

main()
.catch((e) => {
    console.error(e)
    process.exit(1)
    }
)
