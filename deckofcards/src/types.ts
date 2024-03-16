interface CardImageProps {
  svg: string
  png: string
}

export interface CardProps {
  code: string
  image: string
  images: CardImageProps
  value: string
  suit: string
}

export interface DrawResponseProps {
  succsess: boolean
  deck_id: string
  cards: CardProps[]
  remaining: number
}
