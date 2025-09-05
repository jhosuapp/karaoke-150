import { z } from 'zod';

const loginValidation = z.object({
    email: z.string().min(5, 'Ingresa mínimo 5 caracteres').email('Ingresa un email válido'),
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