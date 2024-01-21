
import { prisma } from "@/lib/db"

import fs from 'fs';
import csv from 'csv-parser';
import { promisify } from 'util';
import stream from 'stream';

const pipeline = promisify(stream.pipeline);

interface WineEntry {
  producerName: string;
  wineName: string;
  vintage: string;
  region: string;
  abv: string;
  pesoPrice: number;
}

async function processWineEntries(wineEntries: WineEntry[]): Promise<void> {
    console.log(`Procesando ${wineEntries.length} vinos`);
    
    const producers = new Map<string, WineEntry[]>();
  
    // Agrupar vinos por productor
    for (const wine of wineEntries) {
      const producerWines = producers.get(wine.producerName) || [];
      producerWines.push(wine);
      producers.set(wine.producerName, producerWines);
    }
  
    // Convertir el iterador del Map en un arreglo
    const producerEntries = Array.from(producers);
  
    for (const [producer, wines] of producerEntries) {
      console.log(`Productor: ${producer}`);
      try {
        const dbProducer = await prisma.producer.create({
          data: {
            name: producer,
          },
        });
  
        for (const wine of wines) {
          console.log(`- Vino: ${wine.wineName}, Añada: ${wine.vintage}, Región: ${wine.region}, ABV: ${wine.abv}, Precio: $${wine.pesoPrice}`);
  
          const dbWine = await prisma.wine.create({
            data: {
              name: wine.wineName,
              vintage: parseInt(wine.vintage),
              region: wine.region,
              producerId: dbProducer.id,
            },
          });
  
          const gabiTasting = await prisma.tasting.create({
            data: {
              taster: "Gabi",
              wineId: dbWine.id,
              tastingDate: new Date("2024-02-01"),
              abv: parseFloat(wine.abv.replace(/,/g, '.')),
              pesoPrice: wine.pesoPrice,
            },
          });
  
          if (gabiTasting) {
            console.log(`- Tasting: ${gabiTasting.id} created`);
          }

          const tim2023Tasting = await prisma.tasting.create({
            data: {
              taster: "Tim",
              wineId: dbWine.id,
              tastingDate: new Date("2023-02-02"),
            },
          });

          const tim2021Tasting = await prisma.tasting.create({
            data: {
              taster: "Tim",
              wineId: dbWine.id,
              tastingDate: new Date("2021-02-02"),
            },
          });

          const tim2020Tasting = await prisma.tasting.create({
            data: {
              taster: "Tim",
              wineId: dbWine.id,
              tastingDate: new Date("2020-02-02"),
            },
          });
        }
      } catch (error) {
        console.error(`Error procesando el productor ${producer}: ${error}`);
      }
    }
  }

async function deleteAll() {
  await prisma.producer.deleteMany({});  
}

async function main() {
  // await deleteAll();
  // return
  const results: WineEntry[] = [];

  await pipeline(
    fs.createReadStream('/home/raphael/Downloads/tasting-data-v1.csv'),
    //fs.createReadStream('/home/raphael/Downloads/tasting-data-vtest.csv'),    
    csv(),
    async function (source) {
      for await (const row of source) {
        const entry: WineEntry = {
          producerName: row['Producer name'],
          wineName: row['Wine name'],
          vintage: row['vintage'],
          region: row['region'],
          abv: row['abv'],
          pesoPrice: parseFloat(row['pesoPrice'].replace(/,/g, '.')),
        };
        results.push(entry);
      }
    }
  );

  await processWineEntries(results);
}

main()
.catch((e) => {
    console.error(e)
    process.exit(1)
    }
)
