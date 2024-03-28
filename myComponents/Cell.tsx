import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons'

interface cellProps {
    no: number;
    cellInfo: {
        cells: (string | null)[];
        setCells: React.Dispatch<React.SetStateAction<(string | null)[]>>
    }
    chance: {
        isXChance: boolean
        setIsXChance: React.Dispatch<React.SetStateAction<boolean>>
    }
    winner: string | null
}

const Cell: React.FC<cellProps> = ({ no, cellInfo, chance, winner }) => {
    const { isXChance, setIsXChance } = chance
    const { cells, setCells } = cellInfo
    const player = isXChance ? 'X' : 'O'

    const onPressHandler = () => {
        if (cells[no] === null && winner === null) {
            setCells((prevCellInfo) => {
                const newCellInfo = [...prevCellInfo]
                newCellInfo[no] = player
                return newCellInfo
            })
            setIsXChance((prevState) => !prevState)
        }
    }
    return (
        <TouchableWithoutFeedback
            onPress={onPressHandler} >
            <View style={styles.cellView}>
                {cells[no] !== null ? (
                    <Entypo name={cells[no] === 'X' ? "cross" : "circle"} size={68} color={cells[no] === "X" ? "blue" : "red"} />
                ) : null}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    cellView: {
        minWidth: 110,
        minHeight: 110,
        borderWidth: 2,
        borderColor: '#3b3b3b',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Cell