import React from "react";
import {Text} from "react-native";
import { View, Button , Left, Right} from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './FabStyle';

export const Fab = ({onPressAction})=>{
	return (
		<Button style={styles.fabContainer} onPress={onPressAction}>	
				<Text style={styles.btnText}> Next</Text>
				{/* <Icon style={styles.btnText} name="arrow-right"/> */}
		</Button>

	);
}

export default  Fab;