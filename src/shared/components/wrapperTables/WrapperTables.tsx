import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BodyItemPrimaryWrapperTables, BodyItemSecondaryWrapperTables, BodyItemTertiaryWrapperTables, HeadItemWrapperTables } from '../../interfaces';
import { AnimatedCounter } from '../counter/Counter';

import styles from './wrapperTables.module.css';
import micro from '/assets/icon-microphone-s.png';
import { fadeInMotion } from '../../motion';


type Props = {
  className?: string;
  headItems: HeadItemWrapperTables;
  bodyItemsPrimary?: BodyItemPrimaryWrapperTables[];
  bodyItemsSecondary?: BodyItemSecondaryWrapperTables[];
  bodyItemTertiary?: BodyItemTertiaryWrapperTables;
  children?: ReactNode;
};

const WrapperTables = ({ className, headItems, bodyItemsPrimary, bodyItemsSecondary, bodyItemTertiary, children }:Props) => {
    return (
        <motion.section 
            {...fadeInMotion(0.4, 0.4)}
            className={ `${styles.wrapperTables} ${className}` }
        >
            <motion.article
                {...fadeInMotion(0.5, 0.5)}
                className={ styles.wrapperTables__children }
            >
                { children }
            </motion.article>
            <motion.article 
                {...fadeInMotion(0.6, 0.6)}
                className={ styles.wrapperTables__content }
            >
                <motion.article 
                    {...fadeInMotion(0.7, 0.7)}
                    className={ styles.wrapperTables__head }
                >
                    {headItems.map((item, i) => (
                        <p key={`head-${i}`}>{item}</p>
                    ))}
                </motion.article>
                <article className={ styles.wrapperTables__body }>
                    {bodyItemsPrimary && bodyItemsPrimary.map((row, i) => (
                        <motion.div 
                            {...fadeInMotion((i + 1) * 0.05, (i + 1) * 0.05)}
                            key={`body-${i}`} 
                            className={`${styles.wrapperTables__body__item} ${i < 3 && styles.wrapperTables__body__item__podium}`}
                        >
                            <p className={ styles.wrapperTables__body__item__top }>
                                {i < 3 && <img src={ micro } alt="Icon micro" />}
                                {row.position}
                            </p>
                            <p>{row.name}</p>
                            <AnimatedCounter value={row.score} />
                        </motion.div>
                    ))}
                    {bodyItemsSecondary && bodyItemsSecondary.map((row, i) => (
                        <motion.div 
                            {...fadeInMotion(i * 0.05, i * 0.05)}
                            key={`body-secondary-${i}`} 
                            className={styles.wrapperTables__body__item}
                        >
                            <p>{row.date}</p>
                            <AnimatedCounter value={row.score} />
                        </motion.div>
                    ))}
                    {bodyItemTertiary && (
                        <motion.div
                            className="p-[2px]"
                            animate={{
                                background: [
                                    "linear-gradient(45deg, #FFEB00, #00D4FF)",
                                    "linear-gradient(90deg, #FFEB00, #00D4FF)",
                                    "linear-gradient(180deg, #FFEB00, #00D4FF)",
                                    "linear-gradient(360deg, #FFEB00, #00D4FF)",
                                    "linear-gradient(180deg, #FFEB00, #00D4FF)",
                                    "linear-gradient(90deg, #FFEB00, #00D4FF)",
                                    "linear-gradient(45deg, #FFEB00, #00D4FF)",
                                ],
                            }}
                            transition={{
                                duration: 4,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            <motion.div 
                                {...fadeInMotion(0.3, 0.3)}
                                className={`bg-black bg-opacity-25 ${styles.wrapperTables__body__item}`}
                            >
                                <p>{bodyItemTertiary.position}</p>
                                <AnimatedCounter value={bodyItemTertiary.score} />
                            </motion.div>
                        </motion.div>
                    )}
                </article>
            </motion.article>
        </motion.section>
    )
}

export { WrapperTables }