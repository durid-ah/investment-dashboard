use diesel::{prelude::Insertable, Queryable, Selectable};

#[derive(Queryable, Selectable, serde::Serialize)]
#[diesel(table_name = crate::schema::account)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Account {
    id: i32,
    account_name: String,
}

#[derive(Insertable)]
#[diesel(table_name = crate::schema::account)]
pub struct NewAccount {
    pub account_name: String,
}

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::investment)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Investment {
    id: i32,
    account_id: i32,
    ticker: String,
    shares: f32,
    value: f32,
    category: Option<String>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::schema::investment)]
pub struct NewInvestment {
    pub account_id: i32,
    pub ticker: String,
    pub shares: f32,
    pub value: f32,
    pub category: Option<String>,
}

#[derive(Insertable, Selectable, Queryable)]
#[diesel(table_name = crate::schema::ticker)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Ticker {
    pub ticker_name: String,
}
