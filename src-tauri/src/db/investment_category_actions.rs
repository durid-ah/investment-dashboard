use diesel::{query_dsl::methods::SelectDsl, RunQueryDsl, SelectableHelper};

use crate::db::{models, utils::establish_connection};

use super::{models::InvestmentCategory, utils::List};

#[tauri::command]
pub fn get_categories() -> Result<List<InvestmentCategory>, String> {
    use crate::schema::investment_category::dsl::*;

    let conn = &mut establish_connection();
    let results = investment_category
        .select(models::InvestmentCategory::as_select())
        .load(conn);

    match results {
        Ok(res) => {
            let res = res.into_iter().collect();
            Ok(List(res))
        }
        Err(err) => Err(err.to_string()),
    }
}

