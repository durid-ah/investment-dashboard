use diesel::{Queryable, Selectable};

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::account)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Account {
    id: i64,
    account: String,
}