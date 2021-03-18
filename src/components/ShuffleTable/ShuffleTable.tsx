import { VFC } from "react"
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
import ReactSound, { ReactSoundProps } from "react-sound"

import { useShuffleTable, UseShuffleTableInterface, TableProps } from './useShuffleTable'
import { useMessenger, UseMessengerInterface } from './useMessenger'

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
    marginRight: `16px`,
    backgroundColor: theme.palette.primary.main,
  }
}))

export interface ShuffleTablePresenterProps
  extends ShuffleTableProps {
    table: TableProps
    shuffling: boolean
    shuffleKeyIndex: number
    soundProps: ReactSoundProps
    takeShuffle: UseShuffleTableInterface['takeShuffle']
    sendMessage: UseMessengerInterface['sendMessage']
  }

export interface ShuffleTableProps {}

const ShuffleTablePresenter: VFC<ShuffleTablePresenterProps> = (props) => {
  const {
    table,
    shuffling,
    shuffleKeyIndex,
    soundProps,
    takeShuffle,
    sendMessage
  } = props

  const classes = useStyles()

  return (
    <div>
      <ReactSound {...soundProps} />
      <TableContainer className={classes.container}>
        <Table size="small" className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              {table.columns.map((column, i) => {
                return (
                  <TableCell key={i} className={classes.headCell}>
                    {column}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.rows.map((row, i) => (
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
        onClick={() => takeShuffle()}
      >
        {(!shuffling) ? `シャッフルする` : `ストップ！`}
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => sendMessage(table.rows, shuffleKeyIndex)}
      >
        {`Send`}
      </Button>
    </div>
  )
}

export const ShuffleTable: VFC<ShuffleTableProps> = () => {
  const {
    table,
    shuffling,
    shuffleKeyIndex,
    soundProps,
    takeShuffle
  } = useShuffleTable()
  const { sendMessage } = useMessenger()

  return (
    <ShuffleTablePresenter
      table={table}
      shuffling={shuffling}
      shuffleKeyIndex={shuffleKeyIndex}
      soundProps={soundProps}
      takeShuffle={takeShuffle}
      sendMessage={sendMessage}
    />
  )
}
