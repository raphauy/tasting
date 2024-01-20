import { TastingDAO } from "@/services/tasting-services";
import { DeleteTastingDialog } from "../admin/tastings/tasting-dialogs";

type Props= {
    tasting: TastingDAO
}
export default function TastingControls({tasting}: Props) {
  return (
    <div className="flex items-center">
        {/* <Link href={`/overview/${tasting.id}`} prefetch={false}>
          <Button variant="ghost">
            <Expand />
          </Button>
        </Link>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <TastingDialog id={tasting.id} wineId={tasting.wineId} /> */}
        <DeleteTastingDialog id={tasting.id} description={`Do you want to delete this Tasting of ${tasting.taster}?`} />
    </div>
  )
}
