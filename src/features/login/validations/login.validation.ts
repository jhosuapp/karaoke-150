import { z } from 'zod';

const loginValidation = z.object({
    phone: z.string().min(10, 'Ingresa mínimo 10 caracteres').max(10, 'Puede ingresar máximo 10 caracteres'),
    tyc: z.boolean().refine(
        (value) => value,
        {
          message: 'El campo es requerido', 
        },
    ),
    pyp: z.boolean().refine(
        (value) => value,
        {
          message: 'El campo es requerido', 
        },
    ),
})

export type LoginInterface = z.infer<typeof loginValidation>;
export { loginValidation };