import Link from "next/link";
import Checkbox from "../components/checkbox";
import { useQueryClient } from "@tanstack/react-query";
import { Account } from "./account-calls";

type AccountProp = {
  account: Account,
}

export function AccountRow({account} : AccountProp) {
  const internalQueryClient = useQueryClient()
  const toggleSelect = (accountId: number) => {
    internalQueryClient.setQueryData(['accounts'], (oldAccts: Account[]) => {
      const targetIdx = oldAccts.findIndex(ac => ac.id === accountId);
      const newAccts = [...oldAccts]
      newAccts[targetIdx] = {
        ...newAccts[targetIdx],
        isSelected: !newAccts[targetIdx].isSelected
      }

      return newAccts 
    })
  }

  return (
    <tr>
      <th>
        <label>
          <Checkbox
            isSelected={account.isSelected} 
            onChange={() => toggleSelect(account.id)}/>
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div contentEditable={"plaintext-only"} className="font-bold">{account.account_name}</div>
        </div>
      </td>
      <th className="flex flex-row justify-center">
        <Link href={`/investments?accountId=${account.id}`} 
          className="btn btn-ghost btn-xs">
          details
        </Link>
      </th>
    </tr>
  )
}