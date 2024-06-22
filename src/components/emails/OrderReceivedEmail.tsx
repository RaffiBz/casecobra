import { ShippingAddress } from "@prisma/client";

interface OrderReceivedEmailProps {
  shippingAddress: ShippingAddress;
  orderId: string;
  orderDate: string;
}

const OrderReceivedEmail = ({
  shippingAddress,
  orderId,
  orderDate,
}: OrderReceivedEmailProps): string => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_SERVER_URL;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Order Received</title>
        <style>
          ${mainStyle()}
          ${globalStyle()}
        </style>
      </head>
      <body style="${objectToStyleString(main)}">
        <div style="${objectToStyleString(container)}">
          <div style="${objectToStyleString(message)}">
            <img src="${baseUrl}/snake-3.png" width="65" height="73" alt="delivery snake" style="margin: auto;" />
            <h1 style="${objectToStyleString(
              global.heading
            )}">Thank you for your order!</h1>
            <p style="${objectToStyleString(global.text)}">
              We're preparing everything for delivery and will notify you once
              your package has been shipped. Delivery usually takes 2 days.
            </p>
            <p style="${objectToStyleString({
              ...global.text,
              marginTop: "24px",
            })}">
              If you have any questions regarding your order, please feel free
              to contact us with your order number and we're here to help.
            </p>
          </div>
          <hr style="${objectToStyleString(global.hr)}" />
          <div style="${objectToStyleString(global.defaultPadding)}">
            <p style="${objectToStyleString(adressTitle)}">Shipping to: ${
    shippingAddress.name
  }</p>
            <p style="${objectToStyleString({
              ...global.text,
              fontSize: "14px",
            })}">
              ${shippingAddress.street}, ${shippingAddress.city}, 
              ${shippingAddress.state} ${shippingAddress.postalCode}
            </p>
          </div>
          <hr style="${objectToStyleString(global.hr)}" />
          <div style="${objectToStyleString(global.defaultPadding)}">
            <div style="display: inline-flex; gap: 16px; margin-bottom: 40px;">
              <div style="width: 170px;">
                <p style="${objectToStyleString(
                  global.paragraphWithBold
                )}">Order Number</p>
                <p style="${objectToStyleString(track.number)}">${orderId}</p>
              </div>
              <div style="margin-left: 20px;">
                <p style="${objectToStyleString(
                  global.paragraphWithBold
                )}">Order Date</p>
                <p style="${objectToStyleString(track.number)}">${orderDate}</p>
              </div>
            </div>
          </div>
          <hr style="${objectToStyleString(global.hr)}" />
          <div style="${objectToStyleString(global.paddingY)}">
            <div>
              <p style="${objectToStyleString({
                ...footer.text,
                paddingTop: "30px",
                paddingBottom: "30px",
              })}">
                Please contact us if you have any questions. (If you reply to
                this email, we won't be able to see it.)
              </p>
            </div>
            <div>
              <p style="${objectToStyleString(footer.text)}">
                © CaseCobra, Inc. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

const objectToStyleString = (styleObject: {
  [key: string]: string | number;
}): string => {
  return Object.entries(styleObject)
    .map(
      ([key, value]) =>
        `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`
    )
    .join(" ");
};

const mainStyle = (): string => {
  return `
    body {
      background-color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    }
  `;
};

const globalStyle = (): string => {
  return `
    .container {
      margin: 10px auto;
      width: 600px;
      max-width: 100%;
      border: 1px solid #E5E5E5;
    }
    .message {
      padding: 40px 74px;
      text-align: center;
    }
    .address-title {
      margin: 0;
      font-size: 15px;
      font-weight: bold;
    }
    .footer-text {
      margin: 0;
      color: #AFAFAF;
      font-size: 13px;
      text-align: center;
    }
  `;
};

const main: { [key: string]: string | number } = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container: { [key: string]: string | number } = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const track: { [key: string]: { [key: string]: string | number } } = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message: { [key: string]: string | number } = {
  padding: "40px 74px",
  textAlign: "center",
};

const adressTitle: { [key: string]: string | number } = {
  margin: "0",
  lineHeight: "2",
  fontSize: "15px",
  fontWeight: "bold",
};

const footer: { [key: string]: { [key: string]: string | number } } = {
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  },
};

const global: { [key: string]: { [key: string]: string | number } } = {
  paddingX: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  paddingY: {
    paddingTop: "22px",
    paddingBottom: "22px",
  },
  defaultPadding: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "22px",
    paddingBottom: "22px",
  },
  paragraphWithBold: {
    margin: "0",
    lineHeight: "2",
    fontWeight: "bold",
  },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  },
  text: {
    margin: "0",
    lineHeight: "2",
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  },
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

export default OrderReceivedEmail;
