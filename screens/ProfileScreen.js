import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LogOut, LockKeyhole, LockKeyholeOpen,} from 'lucide-react-native';
import { signOut, updatePassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Loading from '../components/loading';
import { useTheme } from '../context/ThemeContext';

import '../i18n'
import { useTranslation } from 'react-i18next';
import { BackButton } from '../components';

export default function ProfileScreen() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    // const [isEditingPassword, setIsEditingPassword] = useState(false);
    // const [showPassword, setShowPassword] = useState(false);

    const [updatedUsername, setUpdatedUsername] = useState('');
    //const [updatedPassword, setUpdatedPassword] = useState('');

    const {t} = useTranslation()
    const {theme} = useTheme()

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
    
    
    

    const handleLogout = async () => {
        await signOut(auth);
    };


    return (
        <>
            {!userData && loading ? (
                <Loading />
            ) : (
                <View style={[styles.container,theme.contentBackground]}>
                    <BackButton 
                        gradientColors={theme.gradientColors} 
                        iconBackground={theme.iconBackground}
                        iconColor={theme.iconColor}
                        top={0}
                    />

                    <Text style={[styles.title,theme.text]}>{t('profile')}</Text>

                    <View style={styles.editingContainer}>
                        <Text style={[styles.label,theme.text]}>{t('username')}</Text>
                        <TextInput
                            style={styles.input}
                            value={updatedUsername}
                            onChangeText={setUpdatedUsername}
                            editable={isEditingUsername}
                        />
                        <TouchableOpacity
                            style={styles.icon}
                        >
                            {isEditingUsername ? <LockKeyholeOpen color="#3e5c76" size={22} /> : <LockKeyhole color="#3e5c76" size={22} />}
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.label,theme.text]}>{t('email')}</Text>
                    
                    <View style={styles.editingContainer}>
                        
                        <TextInput style={styles.input} value={userData?.email || ''} editable={false} />
                        <LockKeyhole style={styles.emailIcon} color="#3e5c76" size={22} />

                    </View>
                  

                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            onPress={() => {
                                if (isEditingUsername) {
                                
                                if (updatedUsername.trim() === userData?.username) {
                                    Alert.alert('Info', 'No changes were made to the username.');
                                } else {
                                    handleUpdateUsername(); 
                                }
                                }
                                setIsEditingUsername(!isEditingUsername);
                            }}
                                style={styles.editIcon}
                            >
                            
                            <Text style={styles.editButtonText}>
                                {isEditingUsername ? t('save') :  t('edit')}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                            <Text style={{ color: 'white', marginRight: 8 ,fontFamily:"BebasNeue",fontSize:18,letterSpacing:1.5}}>{t('logout')}</Text>
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
        fontFamily:"Poppins-Regular",
        marginBottom: 20,
        textAlign: 'center',
        
    },
    label: {
        fontSize: 16,
        fontFamily:"Anton",
        marginLeft:10,
        marginBottom: 5,
        color: '#f0ebd8',
    },
    input: {
        height: 45,
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
        justifyContent: 'space-between', 
        marginTop: 20,
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF0000',
        padding: 8,
        paddingVertical:16,
        borderRadius: 12,
    },
    editIcon: {
        paddingHorizontal:16,
        paddingVertical:20,
        backgroundColor: '#007bff',
        borderRadius: 12,
        marginRight: 10,
        
    },
    editButtonText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'BebasNeue',
        letterSpacing:1.5,
        textAlign:'center'
    },
    editingContainer: {
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 38,
    },
    emailIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    
});
