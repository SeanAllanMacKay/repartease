import {
  List,
  User,
  X,
  Pencil,
  FloppyDisk,
  ArrowArcLeft,
  Trash,
  CheckCircle,
} from "@phosphor-icons/react";

import type { Icon } from "@phosphor-icons/react/dist/lib/types";

export const ICON_MAPPING: Record<string, Icon> = {
  menu: List,
  user: User,
  close: X,
  edit: Pencil,
  undo: ArrowArcLeft,
  save: FloppyDisk,
  delete: Trash,
  selected: CheckCircle,
};
