import { 
    // getCategories, 
    // productSearchByName, 
    // productSearchByCategory,
    // productSearchByPriceRange,
    // productSearchByUser,
    // getUserById,
    // getUserByEmail,
    // getProductById,
    // getProductRatingById,
    // getProductReviewById,
    getUserRatingById, 
    // getUsers,
    // createProduct,
    // createUser,
    // createReview,
    // updateProductById,
    // updateUserById,
    // updateReviewById,
    // deleteProductById,
    // deleteReviewById,
    // deleteUserById,
  } from '../lib/data';
  
  export async function GET() {
    try {
      // return Response.json(await getCategories());
      // return Response.json(await productSearchByName("hand"));
      // return Response.json(await productSearchByName(1));
      // return Response.json(await productSearchByPriceRange(40, 60));
      // return Response.json(await productSearchByUser(1));
      // return Response.json(await getProductById(1));
      // return Response.json(await getUserById(17));
      // return Response.json(await getProductRating(1));
      // return Response.json(await getProductReview(1));
      return Response.json(await getUserRatingById(1));
      // return Response.json(await getUsers());
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
  }