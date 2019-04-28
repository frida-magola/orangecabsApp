const styles = {
    fabContainer: {
        borderColor: "#fff",
        borderWidth: 1,
        height: 40,
        width: 85,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 100,
        right:20,
        top:630,
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        backgroundColor:"#F89D29"
    },
    disabledState:{       
        backgroundColor: "#D7D7D7",
    },
    activeState: {
        backgroundColor:"#FF5E3A",
    },
    btnText: {
        fontSize: 16,
        color:"#fff",
    },
    amount:{
        fontWeight:"bold",
        fontSize: 12
    }
};

export default styles;