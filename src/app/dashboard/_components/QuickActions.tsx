import { S } from "@/lib/styles";
import { QuickLink } from "./QuickLink";
import {
  PlusCircle,
  Calendar,
  UserPlus,
  Clock,
  ChevronRight
} from "lucide-react";

export function QuickActions() {
  return (
    <div className={`${S.card} ${S.cardP}`}>
      <h2 className="text-lg font-medium mb-3">Snabbåtgärder</h2>
      <div className="grid gap-2">
        <QuickLink
          href="/wishlist/new"
          icon={<PlusCircle className="h-4 w-4" />}>
          Skapa ny lista
        </QuickLink>
        <QuickLink href="/calendar" icon={<Calendar className="h-4 w-4" />}>
          Gå till kalendern
        </QuickLink>
        <QuickLink
          href="/dashboard/friends"
          icon={<UserPlus className="h-4 w-4" />}>
          Lägg till vän
        </QuickLink>
        <QuickLink
          href="/dashboard/reminders"
          icon={<Clock className="h-4 w-4" />}>
          Lägg till påminnelse
        </QuickLink>
        <QuickLink
          href="/dashboard/settings"
          icon={<ChevronRight className="h-4 w-4" />}>
          Ändra inställningar
        </QuickLink>
      </div>
    </div>
  );
}
