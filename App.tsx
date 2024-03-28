import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Cell from './myComponents/Cell';

type cellType = 'X' | 'O' | null

const App: React.FC = () => {

  const [cells, setCells] = useState < cellType[] > (Array(9).fill(null))
  const [isXChance, setIsXChance] = useState < boolean > (true)
  const [winner, setWinner] = useState < cellType | null > (null)

  function PlayCell(no: number): JSX.Element {
    return (
      <Cell
        no={no}
        cellInfo={{ cells, setCells }}
        chance={{ isXChance, setIsXChance }}
        winner={winner}
      />
    )
  }

  const winPosition: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  function calculateWin(): void {
    for (let i = 0; i < winPosition.length; i++) {
      if (
        cells[winPosition[i][0]] !== null &&
        cells[winPosition[i][0]] === cells[winPosition[i][1]] &&
        cells[winPosition[i][0]] === cells[winPosition[i][2]]
      ) {
        setWinner(cells[winPosition[i][0]])
        return
      }
    }
  }

  useEffect(() => {
    calculateWin();
  }, [isXChance])

  function resetValues(): void {
    setWinner(null);
    setCells(Array(9).fill(null));
    setIsXChance(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.header}>
        <Text style={styles.headerText}>Tic Tac Toe Game</Text>
        <Ionicons name="game-controller-outline" size={38} color="#3b3b3b"
          onPress={resetValues} />
      </View>
      <View style={styles.featureContainer}>
        {winner !== null ? <Text style={[styles.primaryText, styles.winnerText]}>{winner} WON </Text>
          : <Text style={styles.primaryText}>Player: {isXChance ? 'X' : 'O'}</Text>}
        <Ionicons
          style={styles.resetIcon}
          name="reload-circle"
          size={45}
          color="#3b3b3b"
          onPress={resetValues} />
      </View>
      <View style={styles.playBoard}>
        <View style={styles.rows}>
          {PlayCell(0)}
          {PlayCell(1)}
          {PlayCell(2)}
        </View>
        <View style={styles.rows}>
          {PlayCell(3)}
          {PlayCell(4)}
          {PlayCell(5)}
        </View>
        <View style={styles.rows}>
          {PlayCell(6)}
          {PlayCell(7)}
          {PlayCell(8)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flexDirection: "row",
    width: '90%',
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 100,
  },
  headerText: {
    fontSize: 34,
    fontWeight: "700",
    color: "red"
  },
  playBoard: {
    borderWidth: 10,
    borderRadius: 10,
    borderColor: '#e7548'
  },
  rows: {
    flexDirection: 'row'
  },
  resetIcon: {
    position: 'absolute',
    left: 30
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20
  },
  primaryText: {
    fontSize: 36,
    color: '#3b3b3b',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  winnerText: {
    color: '#e75480',
    fontSize: 48
  }
});

export default App

