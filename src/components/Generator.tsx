'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

import {useState, useEffect, useRef, useCallback} from 'react'
import _ from 'lodash'
import NextImage from 'next/image'
import {Button} from '@/components/ui/Button'
import {Download, Shuffle, Loader} from 'lucide-react'
import {useIsMounted} from '@/hooks/useIsMounted'
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
} from '@/lib/traits-data'

const Generator = () => {
  const [background, setBackground] = useState('None')
  const [body] = useState('body')
  const [smokestick, setSmokestick] = useState('None')
  const [banditMask, setBanditMask] = useState('None')
  const [kick, setKick] = useState('None')
  const [shade, setShade] = useState('None')
  const [disguise, setDisguise] = useState('None')
  const [trouser, setTrouser] = useState('None')
  const [headgear, setHeadgear] = useState('None')
  const [habiliment, setHabiliment] = useState('None')
  const [whiskerAndChinCurtain, setWhiskerAndChinCurtain] = useState('None')

  const [generatedImage, setGeneratedImage] = useState(null)

  const canvasRef = useRef(null)

  const generateCanvasImage = useCallback(async () => {
    try {
      const canvas: any = canvasRef.current

      const ctx = canvas.getContext('2d')

      if (background !== 'none') {
        const backgroundImg = await loadImage(
          `images/traits/backgrounds/${background}.png`,
        )
        ctx.drawImage(backgroundImg, 0, 0)
      }

      if (body !== 'none') {
        const bodyImg = await loadImage(`images/traits/body/${body}.png`)
        ctx.drawImage(bodyImg, 0, 0)
      }

      if (smokestick !== 'none') {
        const smokestickImg = await loadImage(
          `images/traits/smokesticks/${smokestick}.png`,
        )
        ctx.drawImage(smokestickImg, 0, 0)
      }

      if (banditMask !== 'none') {
        const banditMaskImg = await loadImage(
          `images/traits/bandit-masks/${banditMask}.png`,
        )
        ctx.drawImage(banditMaskImg, 0, 0)
      }

      if (kick !== 'none') {
        const kickImg = await loadImage(`images/traits/kicks/${kick}.png`)
        ctx.drawImage(kickImg, 0, 0)
      }

      if (shade !== 'none') {
        const shadeImg = await loadImage(`images/traits/shades/${shade}.png`)
        ctx.drawImage(shadeImg, 0, 0)
      }

      if (disguise !== 'none') {
        const disguiseImg = await loadImage(
          `images/traits/disguises/${disguise}.png`,
        )
        ctx.drawImage(disguiseImg, 0, 0)
      }

      if (trouser !== 'none') {
        const trouserImg = await loadImage(
          `images/traits/trousers/${trouser}.png`,
        )
        ctx.drawImage(trouserImg, 0, 0)
      }

      if (headgear !== 'none') {
        const headgearImg = await loadImage(
          `images/traits/headgears/${headgear}.png`,
        )
        ctx.drawImage(headgearImg, 0, 0)
      }

      if (habiliment !== 'none') {
        const habilimentImg = await loadImage(
          `images/traits/habiliments/${habiliment}.png`,
        )
        ctx.drawImage(habilimentImg, 0, 0)
      }

      if (whiskerAndChinCurtain !== 'none') {
        const whiskerAndChinCurtainImg = await loadImage(
          `images/traits/whiskers-and-chin-curtains/${whiskerAndChinCurtain}.png`,
        )
        ctx.drawImage(whiskerAndChinCurtainImg, 0, 0)
      }

      return canvas.toDataURL('image/png')
    } catch (error) {
      console.error(error)
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
  ])

  const generateRandomImage = useCallback(async () => {
    setBackground(_.sample(backgrounds) as string)
    setSmokestick(_.sample(smokesticks) as string)
    setBanditMask(_.sample(banditMasks) as string)
    setKick(_.sample(kicks) as string)
    setShade(_.sample(shades) as string)
    setDisguise(_.sample(disguises) as string)
    setTrouser(_.sample(trousers) as string)
    setHeadgear(_.sample(headgears) as string)
    setHabiliment(_.sample(habiliments) as string)
    setWhiskerAndChinCurtain(_.sample(whiskersAndChinCurtains) as string)

    const generatedImageUrl = await generateCanvasImage()
    setGeneratedImage(generatedImageUrl)
  }, [generateCanvasImage])

  const handleTraitChange = async () => {
    setGeneratedImage(null)
    const generatedImageUrl = await generateCanvasImage()
    setGeneratedImage(generatedImageUrl)
  }

  const handleDownloadClick = async (e: {preventDefault: () => void}) => {
    e.preventDefault()
    const generatedImageUrl = await generateCanvasImage()

    const link = document.createElement('a')
    link.download = 'bandit.png'
    link.href = generatedImageUrl
    link.click()
  }

  const isMounted = useIsMounted()

  const runOnMountOnce = useRef(false)

  useEffect(() => {
    if (isMounted && runOnMountOnce.current === false) {
      generateRandomImage()
      runOnMountOnce.current = true
    }
  }, [generateRandomImage, isMounted])

  useEffect(() => {
    generateCanvasImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  ])

  function loadImage(src: string) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  return (
    <div className="lg:flex flex-row w-full mx-auto gap-6">
      <div className="flex justify-center items-start flex-none mb-8 lg:mb-0 basis-[360px]">
        {generatedImage ? (
          <NextImage
            src={generatedImage ?? '/public/placeholder.png'}
            alt="Generated bandit"
            className="max-w-full rounded"
            width={360}
            height={360}
          />
        ) : (
          <div className="text-black w-[360px] max-w-full aspect-square bg-primary flex items-center justify-center text-xl rounded">
            <Loader className="animate-spin" size={36} />
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={360}
          height={360}
          className="hidden"
        ></canvas>
      </div>
      <form onSubmit={handleDownloadClick} className="flex-auto">
        <div className="space-y-4">
          <Select
            onValueChange={value => setBackground(value)}
            value={background}
          >
            <SelectTrigger>
              <SelectValue placeholder="--- Select Background" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Backgrounds</SelectLabel>
                <SelectItem value="none">None</SelectItem>
                {backgrounds.map((value, index) => (
                  <SelectItem key={`backgrounds-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={value => setSmokestick(value)}
            value={smokestick}
          >
            <SelectTrigger className="placeholder:text-red-50">
              <SelectValue placeholder="--- Select Smokestick" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Smokesticks</SelectLabel>
                <SelectItem value="none">None</SelectItem>
                {smokesticks.map((value, index) => (
                  <SelectItem key={`smokesticks-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={value => setBanditMask(value)}
            value={banditMask}
          >
            <SelectTrigger>
              <SelectValue placeholder="--- Select Bandit Mask" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Bandit Masks</SelectLabel>
                <SelectItem value="none">None</SelectItem>
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
                <SelectItem value="none">None</SelectItem>
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
                <SelectItem value="none">None</SelectItem>
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
                <SelectItem value="none">None</SelectItem>
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
                <SelectItem value="none">None</SelectItem>
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
                <SelectItem value="none">None</SelectItem>
                {headgears.map((value, index) => (
                  <SelectItem key={`headgears-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={value => setHabiliment(value)}
            value={habiliment}
          >
            <SelectTrigger>
              <SelectValue placeholder="--- Select Habiliment" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Habiliments</SelectLabel>
                <SelectItem value="none">None</SelectItem>
                {habiliments.map((value, index) => (
                  <SelectItem key={`habiliments-${index}`} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={value => setWhiskerAndChinCurtain(value)}
            value={whiskerAndChinCurtain}
          >
            <SelectTrigger>
              <SelectValue placeholder="--- Whiskers & Chin Curtains" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--- Whiskers &amp; Chin Curtains</SelectLabel>
                <SelectItem value="none">None</SelectItem>
                {whiskersAndChinCurtains.map((value, index) => (
                  <SelectItem
                    key={`whiskersAndChinCurtains-${index}`}
                    value={value}
                  >
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="block space-y-4 lg:space-y-0 lg:flex flex-row lg:gap-4 mt-4">
          <Button
            type="submit"
            variant="primary"
            className="w-full lg:w-auto space-x-2 flex-1"
          >
            <span>Download</span>
            <Download />
          </Button>
          <Button
            type="button"
            onClick={generateRandomImage}
            variant="subtle"
            className="w-full lg:w-auto space-x-2 flex-1"
          >
            <span>Randomize</span>
            <Shuffle />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Generator
