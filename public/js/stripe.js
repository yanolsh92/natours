/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_gImd9bIGMVfoSb0emRamFUAK00tZLV0Bim');

// export const bookTour = async tourId => {
//   try {
//     //1) Get checkout session from API
//     const session = await axios(
//       `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
//     );

//     console.log(session);

//     //2) Create checkout form +charge credit card
//     await stripe.redirectToCheckout({
//       sessionId: session.data.session.id
//     });
//   } catch (err) {
//     console.log(err);
//     showAlert('error', err);
//   }
// };
export const bookTour = async (tourId, startDateId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}/${startDateId}`
    );

    // 2) Create checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id // Lecture 221, jest zakładka, jakbym nie pamiętał o co chodzi
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
