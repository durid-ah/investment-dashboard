// @generated automatically by Diesel CLI.

diesel::table! {
    account (id) {
        id -> Nullable<Integer>,
        account -> Text,
    }
}

diesel::table! {
    investment (id) {
        id -> Nullable<Integer>,
        account_id -> Integer,
        ticker -> Text,
        shares -> Float,
        value -> Float,
        category -> Nullable<Text>,
    }
}

diesel::table! {
    investment_category (category) {
        category -> Nullable<Text>,
    }
}

diesel::table! {
    ticker (ticker) {
        ticker -> Nullable<Text>,
    }
}

diesel::joinable!(investment -> account (account_id));
diesel::joinable!(investment -> investment_category (category));
diesel::joinable!(investment -> ticker (ticker));

diesel::allow_tables_to_appear_in_same_query!(
    account,
    investment,
    investment_category,
    ticker,
);
