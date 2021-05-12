import { useNavigation } from '@react-navigation/native';
import React, { Reducer, ReducerAction, useEffect, useReducer, useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { API_BASE, getMoviePosterUrl, getPopular, IMAGE_BASE, searchMovies } from '../../api';

const MainScreen: React.FC = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        let result: Promise<any>;
        if (query) {
            result = searchMovies(query);
        } else {
            result = getPopular();
        }
        result.then(setMovies);
    }, [query]);

    return (
        <View>
            <SearchBar 
                platform="default"
                placeholder="Find film for name"
                value={query}
                onChangeText={(text) => setQuery(text)}
                lightTheme={true}
                />
            
            <Text style={{marginTop: 16, marginBottom: 8, marginLeft: 16, fontSize: 24}}>
                {query ? "Results" : "What's popular?"}
            </Text>     

            <FlatList 
                data={movies}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => ( 
                    <ListItem 
                        onPress={() => {navigation.navigate('Details', item.id)}} 
                        bottomDivider={true}>
                        <Image source={{uri: getMoviePosterUrl(item.poster_path)}} style={{width: 64, height: 64}}/>
                        <ListItem.Content>
                            <ListItem.Title>{ item.title }</ListItem.Title>
                            <ListItem.Subtitle numberOfLines={2} ellipsizeMode="tail">{ item.overview }</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                )}
                />
        </View>
    )
} 

export default MainScreen;