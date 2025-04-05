export default function SellerProfile({ sellerId }: { sellerId: string }) {
  // TODO: Fetch seller info with sellerId
  return (
    <div>
      <h2 className="text-xl font-semibold">Seller's Profile info</h2>
      <p>Lorem ipsum seller bio for ID: {sellerId}</p>
    </div>
  );
}