import {formatRelative} from "date-fns";
import {ru} from "date-fns/locale";

export const convertDate = (date: string) => {
    return formatRelative(new Date(date), new Date(), {
        locale: ru,
    });
};