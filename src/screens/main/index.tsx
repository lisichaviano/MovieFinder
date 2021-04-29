import { useNavigation } from '@react-navigation/native';
import React, { Reducer, ReducerAction, useReducer, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { movies } from '../../data/movies';


// interface MainScreenState {
//     query: string
// }

// const mainScreenReducer = (state: MainScreenState, action: {type: string, params: {}}) => {
//     switch (type) {
//         case "SET_QUERY":
//             return { ...state, query: }
//     }
// }

const MainScreen: React.FC = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');

    return (
        <View>
            <SearchBar 
                platform="default"
                placeholder="Busca una pelicula por nombre"
                value={query}
                onChangeText={(text) => setQuery(text)}
                lightTheme={true}
                />

            <Text style={{marginTop: 16, marginBottom: 8, marginLeft: 16, fontSize: 24}}>What's popular?</Text>

            {
                movies.map((movie, index) => (
                    <ListItem key={index} 
                        onPress={() => {navigation.navigate('Details', movie)}} 
                        bottomDivider={true}>
                        <Image source={movie.poster_path} style={{width: 64, height: 64}}/>
                        <ListItem.Content>
                            <ListItem.Title>{ movie.title }</ListItem.Title>
                            <ListItem.Subtitle numberOfLines={2} ellipsizeMode="tail">{ movie.overview }</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))
            }
        </View>
    )
} 

export default MainScreen;