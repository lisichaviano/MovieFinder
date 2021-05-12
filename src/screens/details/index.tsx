import { useNavigation } from '@react-navigation/native';
import React, { Reducer, ReducerAction, useEffect, useReducer, useState } from 'react';
import { Button, Image, Modal, ModalProps, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { AirbnbRating, BottomSheet, Icon } from 'react-native-elements';
import { getMovieDetails, getMoviePosterUrl, getOpinion, IOpinion, saveOpinion } from '../../api';

interface IReviewModalProps {
    visible: boolean;
    onReviewCompleted: (success: boolean, rating: number, review: string) => void;
}

const ReviewModal: React.FC<IReviewModalProps> = ({visible, onReviewCompleted}) => {
    const [rating, setRating] = useState(3);
    const [review, setReview] = useState('');
    const closeReviewModal = (success: boolean) => {
        onReviewCompleted(success, rating, review);
    }

    return (
        <Modal 
            animationType="fade" 
            transparent={true}
            visible={visible}
            onRequestClose={() => closeReviewModal(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.reviewTopBar}>
                        <Icon name='close' onPress={() => closeReviewModal(false)} />
                    </View>
                    
                    <AirbnbRating 
                        showRating={true} 
                        count={5}
                        defaultRating={rating}
                        onFinishRating={(rating) => {setRating(rating)}}/>

                    <TextInput style={styles.reviewInput}
                        multiline={true} 
                        numberOfLines={5}
                        placeholder="Tell your impresion about this movie"
                        value={review} 
                        onChangeText={setReview} />

                    <Button title="Submit" onPress={() => closeReviewModal(true)}/>
                </View>
            </View>
        </Modal>
    )
}

const DetailsScreen: React.FC = ({route}) => {
    const {width, height} = useWindowDimensions();
    const movieId = route.params as string;

    const [movie, setMovie] = useState({});
    const [opinion, setOpinion] = useState<IOpinion>({rating: undefined, review: undefined});
    const [modalVisible, setModalVisible] = useState(false);

    const reviewCompleted = (success: boolean, rating: number, review: string) => {
        if (success) {
            saveOpinion(movieId, {rating, review});
            setOpinion({rating, review});
        }
        setModalVisible(false);
    }

    useEffect(() => {
        getMovieDetails(movieId).then(setMovie);
        getOpinion(movieId).then(setOpinion);
    }, [movieId]);

    const RatingComp = () => (
        <View style={{flexDirection: 'row', marginTop: 16}}>
            <AirbnbRating 
                showRating={false}
                count={5}
                defaultRating={opinion.rating}
                size={24}
                isDisabled={true}/>
        </View>
    );

    const ReviewComp = () => (
        <TextInput style={styles.reviewInput}
            multiline={true} 
            numberOfLines={5}
            editable={false}
            value={opinion.review} />
    );

    console.log(movie);

    return (
        <View style={styles.container}>
            <Image source={{uri: getMoviePosterUrl(movie.poster_path)}} 
                style={{...styles.thumb, width: width - 32, height: height / 3}}/>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.authors}>{
                movie.cast?.filter(
                    (member) => member.order <= 5
                ).map(
                    member => `${member.name} (as ${member.character})`
                ).join(', ')
            }.</Text>
            <Text>{movie.overview}</Text>
            {
                opinion.rating? (<RatingComp />) : null
            }
            {
                opinion.review? (<ReviewComp />) : null
            }
            <View style={{marginBottom: 16}}></View>
            <Button title={!opinion.rating ? "Rate this movie" : "Edit my score"} 
                onPress={() => {setModalVisible(true)}}/>

            <ReviewModal visible={modalVisible} onReviewCompleted={reviewCompleted} />
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16
    },
    thumb: { 
        resizeMode: "contain", 
        backgroundColor: "#fff",
        marginVertical: 16,
        borderColor: "#ccc",
        borderWidth: 0.6,
        borderRadius: 4
    },
    title: {
        fontSize: 24,
        marginBottom: 4
    },
    authors: {
        fontSize: 14,
        marginBottom: 16
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: "#fff",
        borderColor: '#bbb',
        borderWidth: 0.6,
        borderRadius: 4,
        padding: 16,
        flexDirection: 'column'
    },
    reviewTopBar: {
        flexDirection: 'row-reverse'
    },
    reviewInput: { 
        minHeight: 72,
        marginVertical: 16,
        borderColor: '#ccc',
        borderWidth: 0.6,
        borderRadius: 4,
        padding: 8
    }
})

export default DetailsScreen;