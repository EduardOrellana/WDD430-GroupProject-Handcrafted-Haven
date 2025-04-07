type Props = {
  sellerId: string
}

export default function SellerProfile({ sellerId }: Props) {
  return (
    <div>
      <h2 className="text-lg font-bold">Seller Profile</h2>
      <p>This is the profile for seller ID: {sellerId}</p>
    </div>
  )
}