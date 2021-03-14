import { useCallback, useEffect, useState, VFC } from "react"
import {
  makeStyles,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { ShuffleData } from "../../domains/ShuffleData"
import arrayShuffle from "array-shuffle"
import shuffle from "./shuffle.json"

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
  table: {
    borderCollapse: 'separate',
  },
  tableRow: {
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#E9F6FE',
    },
  },
  head: {
    borderCollapse: 'separate',
  },
  headCell: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRight: 0,
    backgroundColor: theme.palette.grey[200],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: `16px`,
    backgroundColor: theme.palette.primary.main,
  }
}))

export interface ShuffleTablePresenterProps
  extends ShuffleTableProps {
    columns: string[]
    rows: string[][]
    shuffling: boolean
    onShuffle: () => void
  }

export interface ShuffleTableProps {}

const ShuffleTablePresenter: VFC<ShuffleTablePresenterProps> = (props) => {
  const { columns, rows, shuffling, onShuffle } = props

  const classes = useStyles()

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table size="small" className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              {columns.map((column, i) => {
                return (
                  <TableCell key={i} className={classes.headCell}>
                    {column}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow className={classes.tableRow}>
                {row.map((row, j) => (
                  <TableCell key={`${i}_${j}`}>{row}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => onShuffle()}
      >
        {(!shuffling) ? `シャッフルする` : `ストップ！`}
      </Button>
    </div>
  )
}

export const ShuffleTable: VFC<ShuffleTableProps> = () => {
  const shuffleData: ShuffleData = JSON.parse(JSON.stringify(shuffle))
  const columns = Object.values(shuffleData.columns)
  const [shuffling, setShuffling] = useState(false)
  const [shuffledRows, setShuffledRows] = useState(
    Object.keys(shuffleData.rows).map((key) => shuffleData.rows[key])
  )
  const rows = shuffledRows[0].map((_, idx) => {
    return shuffledRows.map((v) => v[idx])
  })

  const onShuffle = () => {
    if (!shuffling) {
      setShuffling(true)
    } else {
      setShuffling(false)
    }
  }

  const shuffleRows = useCallback(() => {
    const rows = Object.keys(shuffleData.rows).map((key) => {
      return (key === shuffleData.shuffleKey) ?
        arrayShuffle(shuffleData.rows[key]) : shuffleData.rows[key]
      })
    setShuffledRows(rows)
  }, [shuffleData])

  useEffect(() => {
    const timer = setTimeout(() => {
      shuffleRows()
    }, 200)
    if (!shuffling) {
      clearTimeout(timer)
    }
    return () => clearTimeout(timer)
  }, [shuffling, shuffleRows])

  return (
    <ShuffleTablePresenter
      columns={columns}
      rows={rows}
      shuffling={shuffling}
      onShuffle={onShuffle}
    />
  )
}
