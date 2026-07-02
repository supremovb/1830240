import { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Section from "./Section";

const LETTER_STORAGE_KEY = "monthsary-love-letter-opened";

const letterText = `Hi baby!

Happy monthsarry sa atin! Gusto ko lang sabihin na sobrang mahal na mahal na mahal kita at higit pa sa buhay ko. Salamat kasi hindi ka pa rin sumusuko, sumusuko ka paminsan-minsan pero andito ka pa rin sa tabi ko, minamahal ako. Nagpapasalamat ako sayo, at lalo na sa Diyos dahil hinayaan nya na maging isa tayo, sa hirap man yan o ginhawa, sa sakit o sa ligaya, ang importante TAYO.

Thank you for making my life worth living, kahit na ang dami kong dahilan para sumuko, titignan lang kita, unti-unti ko ulit nararamdaman na kaya ko at mas kakayanin ko pa dahil ayoko na saktan ka.

Sa dami nating napagdaanan, may mga bagay na akong nakakalimutan na ipaalala, sabihin, o gawin ulit sayo na ginagawa ko noon. Kaya sana itong simpleng regalo ko, mapasaya pa rin kita.

Alam ko marami akong pagkukulang, pagkakamali pero lahat ng iyon unti-unti kong itatama hanggang sa pagkatiwalaan mo ulit ako. Mahal na mahal kita at sana mapatawad mo ako sa mga pagkukulang ko sayo.

Kapag nanalo ako sa buhay, ang palagi kong pinagdarasal ay sana ikaw pa rin yung nasa tabi ko, sana andito ka pa rin. Gusto kong maranasan mo yung totoong saya, yung hindi na nagtitipid, hindi na nagdadalawang isip, basta meron at kaya kong ibigay sayo, ibibigay ko lahat.

Sa sobrang pagmamahal ko sayo kahit wala ng matira sa akin, ayos lang basta masaya ka baby. Basta lagi mo tatandaan na kahit anong mangyari, kahit malayo, kahit nasan ako at nasan ka, mahal na mahal na mahal na mahal na mahal na mahal kita!

Yan ang wag na wag mong kakalimutan ilagay sa puso at isip mo. Andito lang ako baby at sana matupad natin lahat ng pangarap natin nang magkasama.

I love you so much my hunnie, my baby! 😘❤️`;

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasReadBefore, setHasReadBefore] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const visibleLetter = useMemo(() => letterText.slice(0, typedLength), [typedLength]);

  useEffect(() => {
    setHasReadBefore(window.localStorage.getItem(LETTER_STORAGE_KEY) === "true");
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    if (hasReadBefore) {
      setTypedLength(letterText.length);
      return undefined;
    }

    setTypedLength(0);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 7;
      setTypedLength(Math.min(index, letterText.length));
      if (index >= letterText.length) {
        window.clearInterval(timer);
        window.localStorage.setItem(LETTER_STORAGE_KEY, "true");
        setHasReadBefore(true);
      }
    }, 22);

    return () => window.clearInterval(timer);
  }, [hasReadBefore, isOpen]);

  const openLetter = () => {
    setIsOpen(true);
  };

  return (
    <Section eyebrow="A letter" title="For my love">
      <div className="love-letter-stage relative mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] border border-champagne/60 px-4 py-10 shadow-glow sm:px-8 lg:px-12">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            className="letter-petal"
            style={{
              left: `${(index * 23) % 100}%`,
              animationDelay: `${index * 0.32}s`,
            }}
          />
        ))}

        {!isOpen && (
          <motion.button
            type="button"
            onClick={openLetter}
            className="sparkle-button love-envelope mx-auto block w-full max-w-2xl"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Open love letter"
          >
            <span className="envelope-flap" />
            <span className="envelope-body">
              <span className="envelope-title">To My Dearest Baby ❤️</span>
              <span className="envelope-hint">Tap to open your letter</span>
              <span className="envelope-seal">
                <Heart className="h-8 w-8 fill-white text-white" />
              </span>
            </span>
          </motion.button>
        )}

        {isOpen && (
          <motion.article
            className="opened-letter relative mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 80, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="letter-corner letter-corner-left">❀</div>
            <div className="letter-corner letter-corner-right">❀</div>
            <div className="kiss-mark kiss-mark-one">💋</div>
            <div className="kiss-mark kiss-mark-two">❤️</div>

            <h3 className="letter-heading">To My Dearest Baby ❤️</h3>

            <div className="letter-scroll" tabIndex={0} aria-label="Love letter content">
              <p className="letter-body">{visibleLetter}</p>
              {typedLength >= letterText.length && (
                <div className="letter-signature">
                  <p>With all my love,</p>
                  <p>Your Baby ❤️ <span className="signature-heart">♥</span></p>
                  <p>😘❤️💋🌹</p>
                </div>
              )}
            </div>
          </motion.article>
        )}
      </div>
    </Section>
  );
}
