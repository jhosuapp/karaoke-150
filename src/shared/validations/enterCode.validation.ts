import { z } from 'zod';

const enterCodeValidation = z.object({
    code: z.string().min(1, 'El campo es obligatorio').max(10, 'Puede ingresar máximo 10 caracteres'),
})

export type EnterCodeInterface = z.infer<typeof enterCodeValidation>;
export { enterCodeValidation };