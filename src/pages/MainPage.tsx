import { makeStyles } from "@material-ui/core"
import { VFC } from "react"
import { ShuffleTable } from "../components/ShuffleTable/ShuffleTable"

const useStyles = makeStyles(() => ({
  root: {
    width: `360px`,
    align: `center`,
    paddingTop: `50px`,
    paddingLeft: `50px`
  }
}))

export const MainPage: VFC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ShuffleTable />
    </div>
  )
}
