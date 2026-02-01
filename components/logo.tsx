import Image from "next/image"

export function Logo() {
  return (
    <div className="relative h-16 w-52 flex items-center justify-center select-none">
      <Image
        src="/frozen-basket-logo.png"
        alt="Frozen Basket - Premium Ice Cream"
        width={208}
        height={64}
        className="object-contain"
        priority
      />
    </div>
  )
}
