type Props = {
  sellerId: string
}

const mockProducts = [
  { id: 1, title: 'Handmade Cup', price: '$20' },
  { id: 2, title: 'Wool Sweater', price: '$35' },
]

export default function SellerProducts({ sellerId }: Props) {
  return (
    <ul>
      {mockProducts.map((product) => (
        <li key={product.id}>
          <strong>{product.title}</strong> - {product.price}
        </li>
      ))}
    </ul>
  )
}