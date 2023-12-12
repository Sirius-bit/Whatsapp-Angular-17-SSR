import { SafeResourceUrl } from "@angular/platform-browser";

export interface User {
    id: number,
    name: string,
    stato: string,
    img: string | undefined,
    chat: string[]
}
