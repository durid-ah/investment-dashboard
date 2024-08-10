// @generated automatically by Diesel CLI.

diesel::table! {
    account (id) {
        id -> Integer,
        account_name -> Text,
    }
}

diesel::table! {
    investment (id) {
        id -> Integer,
        account_id -> Integer,
        ticker -> Text,
        shares -> Float,
        value -> Float,
        category -> Nullable<Text>,
    }
}

diesel::table! {
    investment_category (category) {
        category -> Text,
    }
}

diesel::table! {
    ticker (ticker_name) {
        ticker_name -> Text,
    }
}

diesel::joinable!(investment -> account (account_id));
diesel::joinable!(investment -> investment_category (category));

diesel::allow_tables_to_appear_in_same_query!(account, investment, investment_category, ticker,);
