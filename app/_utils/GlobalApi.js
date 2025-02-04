const { gql, default: request } = require("graphql-request");

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

/**
 * Used to make Get Category Api request
 * @returns 
 */
const GetCategory=async()=>{
    const query = gql`
    query MyQuery {
  categories(first: 50) {
    id
    name
    slug
    icon {
      url
    }
  }
}
    `

    const result = await request(MASTER_URL,query);
    return result;
}

const GetBuisness=async(category)=>{
  const query=gql`
  query GetBuisness {
  restaurants(where: {categories_some: {slug: "`+category+`"}}) {
    aboutUs
    address
    banner {
      url
    }
    categories {
      name
    }
    id
    name
    restroType
    slug
    workingHours
  }
}`
const result = await request(MASTER_URL,query);
return result;
}
const GetBuisnessDetail=async(buisnessSlug)=>{
  const query = gql`
  query RestaurantDetail {
  restaurant(where: {slug: "`+buisnessSlug+`"}) {
    aboutUs
    address
    banner {
      url
    }
    categories {
      name
    }
    id
    name
    restroType
    slug
    workingHours
    menu {
      ... on Menu {
        id
        category
        menuItem {
          ... on MenuItem {
            id
            name
            description
            price
            productimage {
              url
            }
          }
        }
      }
    }
  }
}`
const result = await request(MASTER_URL,query);
return result;
}

const AddToCart=async(data)=>{
  const query=gql`
  mutation AddToCart {
    createUserCart(
      data: {email: "`+data?.email+`", price: `+data.price+`, 
      productDescription: "`+data.description+`", productimage: "`+data.productImage+`", 
      productName: "`+data.name+`",
      restaurant: {connect: {slug: "`+data.restaurantSlug+`"}}
      }
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
  
  `
  const result=await request(MASTER_URL,query);
  return result;
}

const GetUserCart=async(userEmail)=>{
  const query=gql`
  query GetUserCart {
  userCarts(where: {email: "`+userEmail+`"}) {
    id
    price
    productDescription
    productimage
    productName
    restaurant {
      name
      banner {
        url
      }
      slug
    }
  }
}`
const result=await request(MASTER_URL,query);
  return result;
}

const DisconnectRestroFromUserCartItem=async(id)=>{
  const query=gql`
  mutation DisconnectRestaurantFromCartItem {
    updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+id+`"})
    {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
  `;
  const result=await request(MASTER_URL,query);
  return result;
}

const DeleteItemFromCart=async(id)=>{
  const query=gql`
  mutation MyMutation {
  deleteUserCart(where: {id: "`+id+`"}) {
    id
  }
}`
const result=await request(MASTER_URL,query);
  return result;
}

const CreateNewOrder=async(data)=>{
  const query=gql`
  mutation CreateNewOrder {
  createOrder(
    data: {
    email: "`+data?.email+`", 
    orderAmount: "`+data?.orderAmount+`", 
    restaurantName: "`+data?.restaurantName+`", 
    userName: "`+data?.userName+`", 
    phone: "`+data?.phone+`", 
    address: "`+data?.address+`", 
    zipCode: "`+data?.zipCode+`"}
  ) {
    id
  }
}`
const result=await request(MASTER_URL,query);
  return result;
}

const UpdateOrderToAddOrderItems=async(name,price,id,email)=>{
  const query=gql`
  mutation UpdateOrderWithDetail {
    updateOrder(
      data: {orderDetail: {create: {OrderItem: 
        {data: {name: "`+name+`", price: `+price+`}}}}}
      where: {id: "`+id+`"}
    ) {
      id
    }
    publishManyOrders(to: PUBLISHED) {
      count
    }
   
      deleteManyUserCarts(where: {email: "`+email+`"}) {
        count
      }
       
  }
      
  `
  const result=await request(MASTER_URL,query);
  return result;
}


export default{
    GetCategory,
    GetBuisness,
    GetBuisnessDetail,
    AddToCart,
    GetUserCart,
    DisconnectRestroFromUserCartItem,
    DeleteItemFromCart,
    CreateNewOrder,
    UpdateOrderToAddOrderItems,
}