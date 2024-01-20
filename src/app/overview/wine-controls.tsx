import { Separator } from "@/components/ui/separator";
import { ProducerDialog } from "../admin/producers/producer-dialogs";
import { WineDAO } from "@/services/wine-services";
import { DeleteWineDialog, WineDialog } from "../admin/wines/wine-dialogs";
import { TastingDialog } from "../admin/tastings/tasting-dialogs";

type Props= {
    wine: WineDAO
}
export default function WineControls({wine}: Props) {
  return (
    <div className="flex items-center">
        <TastingDialog wineId={wine.id} />
        <Separator orientation="vertical" className="mx-1 h-6" />
        <WineDialog id={wine.id} producerId={wine.producerId} />
        <DeleteWineDialog id={wine.id} description={`Do you want to delete Wine ${wine.name}?`} />
    </div>
  )
}
