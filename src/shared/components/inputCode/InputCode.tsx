import React, { useState } from 'react';
import styles from './inputCode.module.css';
import { InputCodes } from '../../interfaces/inputCode';


type InputCodeProps = {
  inputCode?: InputCodes;
};

const textDefault:string = "🍺🎤 Ingresa los códigos de tus Águila Light, súbete al Karaoke y conviértete en el crack del escenario. ";

const InputCode = ({ inputCode }: InputCodeProps) => {
    let description = inputCode?.description ? inputCode.description : "";
    description = inputCode?.textDefault ? textDefault : description;

    const [code, setCode] = useState('');
    const [error, setError] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
  
    const handleCodeSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (code === '123') {
        setError(false);
        setShowMsg(false);
        alert('bien');
      } else {
        setError(true);
        setShowMsg(true);
      }
    };

  return (
    <form className={styles.form} onSubmit={handleCodeSubmit}>
       
       {description != "" && (
          <p className={styles.description}>
            {description}
          </p>
        )}

        <input
          type="text"
          id="code"
          name="code"
          placeholder="Escribe tu código aquí"
          autoComplete='off'
          value={code}
          onChange={e => { setCode(e.target.value); setError(false); setShowMsg(false); }}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />

        {showMsg && (
          <div className={styles.msgError}>
            Código inválido
          </div>
        )}

        <button
          type="submit"
          className={styles.button}
        >
          INGRESA TU CÓDIGO
        </button>
      </form>
  );
};

export default InputCode;