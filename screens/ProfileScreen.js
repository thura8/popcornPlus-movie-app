import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LogOut, ChevronLeftIcon, Pencil, PencilOff,Eye,EyeOff } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { signOut, updatePassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Loading from '../components/loading';

export default function ProfileScreen() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');

    const fetchUserData = async () => {
        try {
            const uid = auth.currentUser?.uid;
            if (!uid) {
                console.log("No user is logged in.");
                return null;
            }

            const userDocRef = doc(db, "users", uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                return userDoc.data();
            } else {
                console.log("No user data found!");
                return null;
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
            return null;
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            const data = await fetchUserData();
            setUserData(data);
            setUpdatedUsername(data?.username || '');
            setLoading(false);
        };

        getUserData();
    }, []);

    const handleUpdateUsername = async () => {
        try {
            
            if (!updatedUsername.trim()) {
                Alert.alert('Error', 'Username cannot be empty.');
                return;
            }
    
            
            if (updatedUsername.trim() === userData?.username) {
                Alert.alert('Info', 'No changes were made to the username.');
                return;
            }
    
            const uid = auth.currentUser?.uid;
            if (!uid) return;
    
            const userDocRef = doc(db, 'users', uid);
    
            
            await updateDoc(userDocRef, { username: updatedUsername.trim() });
    
            
            setUserData((prev) => ({ ...prev, username: updatedUsername.trim() }));
            setIsEditingUsername(false);
    
            Alert.alert('Success', 'Username updated successfully.');
        } catch (err) {
            console.error('Error updating username:', err);
            Alert.alert('Error', err.message);
        }
    };
    

    // const handleUpdatePassword = async () => {
    //     try {
    //         if (!updatedPassword || updatedPassword === '') {
    //             Alert.alert('Info', 'No changes were made to the password.');
    //             return;
    //         }

    //         await updatePassword(auth.currentUser, updatedPassword);
    //         setIsEditingPassword(false);
    //         Alert.alert('Success', 'Password updated successfully.');
    //     } catch (err) {
    //         console.error('Error updating password:', err);
    //         Alert.alert('Error', err.message);
    //     }
    // };

    const handleLogout = async () => {
        await signOut(auth);
    };

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    const navigation = useNavigation();

    return (
        <>
            {!userData && loading ? (
                <Loading />
            ) : (
                <View style={styles.container}>
                    <SafeAreaView style={styles.safeArea}>
                        <LinearGradient
                            colors={['rgba(116, 140, 171, 0.6)', 'rgba(116, 140, 171, 0.9)']}
                            style={styles.backButton}
                        >
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <ChevronLeftIcon size={34} strokeWidth={2.5} color="white" />
                            </TouchableOpacity>
                        </LinearGradient>
                    </SafeAreaView>

                    <Text style={styles.title}>Profile</Text>

                    <View style={styles.editingContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            value={updatedUsername}
                            onChangeText={setUpdatedUsername}
                            editable={isEditingUsername}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                if (isEditingUsername) handleUpdateUsername();
                                setIsEditingUsername(!isEditingUsername);
                            }}
                            style={styles.icon}
                        >
                            {isEditingUsername ? <Pencil color="#3e5c76" size={22} /> : <PencilOff color="#3e5c76" size={22} />}
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={userData?.email || ''} editable={false} />

                    {/* <View style={styles.editingContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={isEditingPassword ? updatedPassword : '********'}
                            onChangeText={setUpdatedPassword}
                            editable={isEditingPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                if (isEditingPassword) handleUpdatePassword();
                                setIsEditingPassword(!isEditingPassword);
                            }}
                            style={styles.icon}
                        >
                            {isEditingPassword ? <Pencil color="#3e5c76" size={22} /> : <PencilOff color="#3e5c76" size={22} />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconEye}>
                            {showPassword ? <Eye color="#3e5c76" size={22} /> : <EyeOff color="#3e5c76"  size={22}/>}
                        </TouchableOpacity>
                    </View> */}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                            <Text style={{ color: 'white', marginRight: 8 ,fontFamily:"BebasNeue",fontSize:18}}>Log Out</Text>
                            <LogOut color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#1d2d44',
    },
    safeArea: {
        position: 'absolute',
        top: 0,
        left: 15,
        zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        borderRadius: 12,
        padding: 4,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily:"BebasNeue",
        marginBottom: 20,
        textAlign: 'center',
        color: '#f0ebd8',
    },
    label: {
        fontSize: 16,
        fontFamily:"Anton",
        marginLeft:10,
        marginBottom: 5,
        color: '#f0ebd8',
    },
    input: {
        height: 40,
        fontSize:16,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        fontFamily:"Lato"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF0000',
        padding: 8,
        width: 100,
        borderRadius: 12,
    },
    editingContainer: {
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 36,
    },
    iconEye: {
        position: 'absolute',
        right: 50,
        top: 36,
    },
});
