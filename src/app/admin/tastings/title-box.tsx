import React from 'react'

type Props = {
    title: string
}

export default function TitleBox({ title }: Props) {
  return (
    <p className="p-2 border rounded-lg bg-azul text-white font-bold text-xl">{title}</p>
  )
}
