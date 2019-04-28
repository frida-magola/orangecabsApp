import React from "react";
import {Text} from "react-native";
import { View, Button , Left, Right} from "native-base";
// import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './FabStyle';

export const Fab = ({onPressAction})=>{
	return (
		<Button style={styles.fabContainer} onPress={onPressAction}>
			
				<Text style={styles.btnText}> Book now</Text>
				{/* <Icon name="chevron-circle-right"/> */}

		</Button>

	);
}

export default  Fab;