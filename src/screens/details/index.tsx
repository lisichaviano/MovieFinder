import { useNavigation } from '@react-navigation/native';
import React, { Reducer, ReducerAction, useReducer, useState } from 'react';
import { Button, Image, Modal, ModalProps, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { AirbnbRating, BottomSheet, Icon } from 'react-native-elements';
import { IMovieInfo } from '../../data/movies'

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
    const navigation = useNavigation();
    const movie = route.params as IMovieInfo;
    const [modalVisible, setModalVisible] = useState(false);

    const reviewCompleted = (success: boolean, rating: number, review: string) => {
        if (success) {
            movie.rating = rating; 
            movie.review = review;
        }

        setModalVisible(false);
    }

    const RatingComp = () => (
        <View style={{flexDirection: 'row', marginTop: 16}}>
            <AirbnbRating 
                showRating={false}
                count={5}
                defaultRating={movie.rating}
                size={24}
                isDisabled={true}/>
        </View>
    );

    const ReviewComp = () => (
        <TextInput style={styles.reviewInput}
            multiline={true} 
            numberOfLines={5}
            editable={false}
            value={movie.review} />
    );
    
    return (
        <View style={styles.container}>
            <Image source={movie.poster_path} style={{...styles.thumb, width: width - 32, height: height / 3}}/>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.authors}>{movie.authors.join(', ')}.</Text>
            <Text>{movie.overview}</Text>
            {
                movie.rating? (<RatingComp />) : null
            }
            {
                movie.review? (<ReviewComp />) : null
            }
            <View style={{marginBottom: 16}}></View>
            <Button title={!movie.rating ? "Rate this movie" : "Edit my score"} onPress={() => {setModalVisible(true)}}/>

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