import { z } from 'zod';

const registerValidation = z.object({
    name: z.string().min(5, 'Ingresa mínimo 5 caracteres').max(50, 'Puede ingresar máximo 50 caracteres'),
    last_name: z.string().min(5, 'Ingresa mínimo 5 caracteres').max(50, 'Puede ingresar máximo 50 caracteres'),
    birthday: z.any(),
    gender: z.string().min(1, 'El campo es requerido'),
    city: z.string().min(1, 'El campo es requerido'),
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

export type RegisterInterface = z.infer<typeof registerValidation>;
export { registerValidation };