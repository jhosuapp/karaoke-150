import { z } from 'zod';

const enterCodeValidation = z.object({
    code: z.string().min(5, 'El código es de 5 caracteres').max(5, 'Puede ingresar máximo 10 caracteres'),
})

export type EnterCodeInterface = z.infer<typeof enterCodeValidation>;
export { enterCodeValidation };