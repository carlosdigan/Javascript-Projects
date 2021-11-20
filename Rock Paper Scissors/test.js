if (selected_options['User'] == "rock" && selected_options['Computer'] == "scissors")
            return "User";
        else if (selected_options['User'] == "paper" && selected_options['Computer'] == "rock")
            return "User";
        else if (selected_options['User'] == "scissors" && selected_options['Computer'] == "paper")
            return "User";
        else if (selected_options['User'] == selected_options['Computer'])
            return "Tie";  
            
        return "Computer"  