'use client';

import _ from 'lodash';
import { Download, Loader, Shuffle } from 'lucide-react';
import NextImage from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  backgrounds,
  banditMasks,
  disguises,
  habiliments,
  headgears,
  kicks,
  shades,
  smokesticks,
  trousers,
  whiskersAndChinCurtains,
} from '@/lib/traits-data';

const Generator = () => {
  const [background, setBackground] = useState('Hot Sand');
  const [body] = useState('Body');
  const [smokestick, setSmokestick] = useState('Cigar');
  const [banditMask, setBanditMask] = useState('None');
  const [kick, setKick] = useState('None');
  const [shade, setShade] = useState('None');
  const [disguise, setDisguise] = useState('None');
  const [trouser, setTrouser] = useState('Velvet Pants');
  const [headgear, setHeadgear] = useState('None');
  const [habiliment, setHabiliment] = useState('None');
  const [whiskerAndChinCurtain, setWhiskerAndChinCurtain] = useState('None');

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCanvasImage = useCallback(async () => {
    setGeneratedImage(null);
    try {
      const canvas = canvasRef.current;

      const ctx = canvas?.getContext('2d');

      if (background !== 'None') {
        const backgroundImg = await loadImage(`images/traits/backgrounds/${background}.png`);
        ctx?.drawImage(backgroundImg as CanvasImageSource, 0, 0);
      }

      const bodyImg = await loadImage(`images/traits/body/${body}.png`);
      ctx?.drawImage(bodyImg as CanvasImageSource, 0, 0);

      if (smokestick !== 'None') {
        const smokestickImg = await loadImage(`images/traits/smokesticks/${smokestick}.png`);
        ctx?.drawImage(smokestickImg as CanvasImageSource, 0, 0);
      }

      if (banditMask !== 'None') {
        const banditMaskImg = await loadImage(`images/traits/bandit-masks/${banditMask}.png`);
        ctx?.drawImage(banditMaskImg as CanvasImageSource, 0, 0);
      }

      if (kick !== 'None') {
        const kickImg = await loadImage(`images/traits/kicks/${kick}.png`);
        ctx?.drawImage(kickImg as CanvasImageSource, 0, 0);
      }

      if (shade !== 'None') {
        const shadeImg = await loadImage(`images/traits/shades/${shade}.png`);
        ctx?.drawImage(shadeImg as CanvasImageSource, 0, 0);
      }

      if (disguise !== 'None') {
        const disguiseImg = await loadImage(`images/traits/disguises/${disguise}.png`);
        ctx?.drawImage(disguiseImg as CanvasImageSource, 0, 0);
      }

      if (trouser !== 'None') {
        const trouserImg = await loadImage(`images/traits/trousers/${trouser}.png`);
        ctx?.drawImage(trouserImg as CanvasImageSource, 0, 0);
      }

      if (headgear !== 'None') {
        const headgearImg = await loadImage(`images/traits/headgears/${headgear}.png`);
        ctx?.drawImage(headgearImg as CanvasImageSource, 0, 0);
      }

      if (habiliment !== 'None') {
        const habilimentImg = await loadImage(`images/traits/habiliments/${habiliment}.png`);
        ctx?.drawImage(habilimentImg as CanvasImageSource, 0, 0);
      }

      if (whiskerAndChinCurtain !== 'None') {
        const whiskerAndChinCurtainImg = await loadImage(
          `images/traits/whiskers-and-chin-curtains/${whiskerAndChinCurtain}.png`,
        );
        ctx?.drawImage(whiskerAndChinCurtainImg as CanvasImageSource, 0, 0);
      }

      return canvas?.toDataURL('image/png');
    } catch (error) {
      console.error(error);
    }
  }, [
    background,
    banditMask,
    body,
    disguise,
    habiliment,
    headgear,
    kick,
    shade,
    smokestick,
    trouser,
    whiskerAndChinCurtain,
  ]);

  const generateRandomImage = useCallback(async () => {
    setBackground(_.sample(backgrounds) as string);
    setSmokestick(_.sample(smokesticks) as string);
    setBanditMask(_.sample(banditMasks) as string);
    setKick(_.sample(kicks) as string);
    setShade(_.sample(shades) as string);
    setDisguise(_.sample(disguises) as string);
    setTrouser(_.sample(trousers) as string);
    setHeadgear(_.sample(headgears) as string);
    setHabiliment(_.sample(habiliments) as string);
    setWhiskerAndChinCurtain(_.sample(whiskersAndChinCurtains) as string);

    const generatedImageUrl = (await generateCanvasImage()) as string;
    setGeneratedImage(generatedImageUrl);
  }, [generateCanvasImage]);

  const handleDownloadClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const generatedImageUrl = await generateCanvasImage();

    const link = document.createElement('a');
    link.download = 'bandit.png';
    link.href = generatedImageUrl ?? '';
    link.click();
  };

  useEffect(() => {
    (async () => {
      const generatedImageUrl = await generateCanvasImage();
      setGeneratedImage(generatedImageUrl ?? '');
    })();
  }, [
    background,
    body,
    smokestick,
    banditMask,
    kick,
    shade,
    disguise,
    trouser,
    headgear,
    habiliment,
    whiskerAndChinCurtain,
    generateCanvasImage,
  ]);

  function loadImage(src: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  return (
    <div className="mx-auto w-full flex-row gap-6 lg:flex">
      <div className="mb-8 flex flex-none basis-[360px] items-start justify-center lg:mb-0">
        {generatedImage ? (
          <NextImage
            src={generatedImage ?? '/public/placeholder.png'}
            alt="Generated bandit"
            className="max-w-full rounded"
            width={360}
            height={360}
            style={{
              imageRendering: 'pixelated',
            }}
          />
        ) : (
          <div className="flex aspect-square w-[360px] max-w-full items-center justify-center rounded bg-primary text-xl text-black">
            <Loader className="animate-spin" size={36} />
          </div>
        )}
        <canvas ref={canvasRef} width={360} height={360} className="hidden"></canvas>
      </div>
      <form onSubmit={handleDownloadClick} className="flex-auto">
        <div className="space-y-4">
          <Select onValueChange={value => setBackground(value)} value={background}>
            <SelectTrigger>
              <SelectValue placeholder="--- Select Background" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Backgrounds</SelectLabel>
                <SelectItem value="None">None</SelectItem>
                {backgrounds.map((value, index) => (
                  <SelectItem key={`backgrounds-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setSmokestick(value)} value={smokestick}>
            <SelectTrigger className="placeholder:text-red-50">
              <SelectValue placeholder="--- Select Smokestick" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Smokesticks</SelectLabel>
                <SelectItem value="None">None</SelectItem>
                {smokesticks.map((value, index) => (
                  <SelectItem key={`smokesticks-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setBanditMask(value)} value={banditMask}>
            <SelectTrigger>
              <SelectValue placeholder="--- Select Bandit Mask" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Bandit Masks</SelectLabel>
                <SelectItem value="None">None</SelectItem>
                {banditMasks.map((value, index) => (
                  <SelectItem key={`banditMasks-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setKick(value)} value={kick}>
            <SelectTrigger>
              <SelectValue placeholder="--- Select Kick" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Kicks</SelectLabel>
                <SelectItem value="None">None</SelectItem>
                {kicks.map((value, index) => (
                  <SelectItem key={`kicks-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setShade(value)} value={shade}>
            <SelectTrigger>
              <SelectValue placeholder="--- Select Shine Shade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Shine Shades</SelectLabel>
                <SelectItem value="None">None</SelectItem>
                {shades.map((value, index) => (
                  <SelectItem key={`shades-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setDisguise(value)} value={disguise}>
            <SelectTrigger>
              <SelectValue placeholder="--- Select Disguise" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Disguises</SelectLabel>
                <SelectItem value="None">None</SelectItem>
                {disguises.map((value, index) => (
                  <SelectItem key={`disguises-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setTrouser(value)} value={trouser}>
            <SelectTrigger>
              <SelectValue placeholder="--- Select Trouser" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Trouser</SelectLabel>
                <SelectItem value="None">None</SelectItem>
                {trousers.map((value, index) => (
                  <SelectItem key={`trousers-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setHeadgear(value)} value={headgear}>
            <SelectTrigger>
              <SelectValue placeholder="--- Select Headgear" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Headgears</SelectLabel>
                <SelectItem value="None">None</SelectItem>
                {headgears.map((value, index) => (
                  <SelectItem key={`headgears-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setHabiliment(value)} value={habiliment}>
            <SelectTrigger>
              <SelectValue placeholder="--- Select Habiliment" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Habiliments</SelectLabel>
                <SelectItem value="None">None</SelectItem>
                {habiliments.map((value, index) => (
                  <SelectItem key={`habiliments-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setWhiskerAndChinCurtain(value)} value={whiskerAndChinCurtain}>
            <SelectTrigger>
              <SelectValue placeholder="--- Whiskers & Chin Curtains" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Whiskers &amp; Chin Curtains</SelectLabel>
                <SelectItem value="None">None</SelectItem>
                {whiskersAndChinCurtains.map((value, index) => (
                  <SelectItem key={`whiskersAndChinCurtains-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 block flex-row space-y-4 lg:flex lg:gap-4 lg:space-y-0">
          <Button type="submit" variant="primary" className="w-full flex-1 space-x-2 lg:w-auto">
            <span>Download</span>
            <Download />
          </Button>
          <Button
            type="button"
            onClick={generateRandomImage}
            variant="subtle"
            className="w-full flex-1 space-x-2 lg:w-auto"
          >
            <span>Randomize</span>
            <Shuffle />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Generator;
