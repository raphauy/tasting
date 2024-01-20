import { Separator } from "@/components/ui/separator";
import { DeleteProducerDialog, ProducerDialog } from "../admin/producers/producer-dialogs";
import { ProducerDAO } from "@/services/producer-services";
import { WineDialog } from "../admin/wines/wine-dialogs";

type Props= {
    producer: ProducerDAO
}
export default function ProducerControls({producer}: Props) {
  return (
    <div className="flex items-center">
        <WineDialog producerId={producer.id} />
        <Separator orientation="vertical" className="mx-1 h-6" />
        <ProducerDialog id={producer.id} />
        <DeleteProducerDialog id={producer.id} description={`Do you want to delete producer ${producer.name}?`} />
    </div>
  )
}
