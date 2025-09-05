import { z } from "zod";

const allowedDomains = ["facebook.com", "twitter.com", "tiktok.com", "instagram.com"];

const shareUrlValidation = z.object({
    url: z
        .string()
        .min(5, "Ingresa mínimo 5 caracteres")
        .max(200, "Puede ingresar máximo 200 caracteres")
        .refine((value) => {
        try {
            const parsedUrl = new URL(value);

            const hostnameParts = parsedUrl.hostname.split(".");
            const domain = hostnameParts.slice(-2).join(".");

            return allowedDomains.includes(domain);
        } catch {
            return false; // no es una URL válida
        }
    }, "La URL debe ser válida y de Facebook, Twitter, TikTok o Instagram"),
});

export type ShareUrlInterface = z.infer<typeof shareUrlValidation>;
export { shareUrlValidation };
