import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { YooCheckout, ICreatePayment } from "@a2seven/yoo-checkout";
import { main_color } from "../../assets/Styles";
import { ActivityIndicator, View } from "react-native";
export const Pay = () => {
  const checkout = new YooCheckout({
    shopId: "797484",
    secretKey: "test_Nzk3NDg0msxY6ktfxe39Of9FwLZ5KwIddgu67hlllbw",
  });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const body = {
    amount: {
      value: 2.0,
      currency: "RUB",
    },
    confirmation: {
      type: "embedded",
    },
    capture: true,
    description: "Заказ №72",
  };
  useEffect(() => {
    fetch("https://api.yookassa.ru/v3/payments", {
      body: JSON.stringify(body),
      headers: {
        Authorization:
          "Basic Nzk3NDg0OnRlc3RfVnpCZTFVbDg2NVl4VHhfeThtREVqSlMzUUdyTnVqWm94MWZCRE1RemE3RQ==",
        "Content-Type": "application/json",
        "Idempotence-Key": "6765776757ytys",
      },
      method: "POST",
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r.confirmation.confirmation_token);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <ActivityIndicator
          animating={loading}
          style={{
            position: "absolute",
            top: "45%",
            left: "44%",
            zIndex: 9000,
          }}
          size={60}
          color={main_color}
        />
      )}
      <WebView
        cacheEnabled={false}
        containerStyle={{ flex: 1 }}
        onMessage={(e) => {
          setLoading(false);
        }}
        source={{
          uri:
            "https://3dsec.sberbank.ru/demopayment/docsite/payform-1.html?token=YRF3C5RFICWISEWFR6GJ&amount=1000&ask=email&ask=description",
          //            html: `<html lang="en">
          // <head>
          //     <meta charset="UTF-8">
          //     <meta name="viewport"
          //           content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
          //     <title>Document</title>
          // </head>
          // <body>
          // <!--Подключение библиотеки-->
          // <script src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>
          //
          // <!--HTML-элемент, в котором будет отображаться платежная форма-->
          // <div id="payment-form"></div>
          // <script>
          //
          //   //Инициализация виджета. Все параметры обязательные.
          //   const checkout = new window.YooMoneyCheckoutWidget({
          //     confirmation_token: 'ct-27fd2198-000f-5000-9000-1a81ed782b87', //'ct-27fd13fa-000f-5000-a000-175c2106f1e0', //Токен, который перед проведением оплаты нужно получить от ЮKassa
          //     return_url: 'https://merchant.site', //Ссылка на страницу завершения оплаты
          //     error_callback: function(error) {
          //       //Обработка ошибок инициализации
          //     }
          //   });
          //
          //   //Отображение платежной формы в контейнере
          //   checkout.render('payment-form')
          //       //После отображения платежной формы метод render возвращает Promise (можно не использовать).
          //       .then(() => {
          //         window.ReactNativeWebView.postMessage('fddf')
          //       });
          // </script>
          // </body>
          // </html>`
        }}
      />
    </View>
  );
};
