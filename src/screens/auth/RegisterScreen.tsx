import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Title,
  HelperText,
  RadioButton,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AppDispatch, RootState } from '../../store';
import { registerUser } from '../../store/slices/authSlice';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserRole } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  role: yup.string().oneOf(Object.values(UserRole)).required('Please select a role'),
});

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: UserRole.JOB_ACCEPTER,
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterForm) => {
    try {
      await dispatch(
        registerUser({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
        })
      ).unwrap();
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message || 'Please try again');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Create Account</Title>
            <Text style={styles.subtitle}>Join Dhandha today</Text>

            <View style={styles.form}>
              <View style={styles.nameContainer}>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                      <TextInput
                        label="First Name"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        error={!!errors.firstName}
                        left={<TextInput.Icon icon="account" />}
                      />
                      <HelperText type="error" visible={!!errors.firstName}>
                        {errors.firstName?.message}
                      </HelperText>
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                      <TextInput
                        label="Last Name"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        error={!!errors.lastName}
                        left={<TextInput.Icon icon="account" />}
                      />
                      <HelperText type="error" visible={!!errors.lastName}>
                        {errors.lastName?.message}
                      </HelperText>
                    </View>
                  )}
                />
              </View>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      label="Email"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      error={!!errors.email}
                      left={<TextInput.Icon icon="email" />}
                    />
                    <HelperText type="error" visible={!!errors.email}>
                      {errors.email?.message}
                    </HelperText>
                  </View>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      label="Password"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                      error={!!errors.password}
                      left={<TextInput.Icon icon="lock" />}
                      right={
                        <TextInput.Icon
                          icon={showPassword ? 'eye-off' : 'eye'}
                          onPress={() => setShowPassword(!showPassword)}
                        />
                      }
                    />
                    <HelperText type="error" visible={!!errors.password}>
                      {errors.password?.message}
                    </HelperText>
                  </View>
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      label="Confirm Password"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      secureTextEntry={!showConfirmPassword}
                      error={!!errors.confirmPassword}
                      left={<TextInput.Icon icon="lock" />}
                      right={
                        <TextInput.Icon
                          icon={showConfirmPassword ? 'eye-off' : 'eye'}
                          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                      }
                    />
                    <HelperText type="error" visible={!!errors.confirmPassword}>
                      {errors.confirmPassword?.message}
                    </HelperText>
                  </View>
                )}
              />

              <Text style={styles.roleTitle}>I want to:</Text>
              <Controller
                control={control}
                name="role"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.roleContainer}>
                    <RadioButton.Group onValueChange={onChange} value={value}>
                      <View style={styles.radioOption}>
                        <RadioButton value={UserRole.JOB_ACCEPTER} />
                        <Text style={styles.radioText}>Find and complete tasks</Text>
                      </View>
                      <View style={styles.radioOption}>
                        <RadioButton value={UserRole.JOB_POSTER} />
                        <Text style={styles.radioText}>Post tasks for others to complete</Text>
                      </View>
                    </RadioButton.Group>
                    <HelperText type="error" visible={!!errors.role}>
                      {errors.role?.message}
                    </HelperText>
                  </View>
                )}
              />

              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                loading={isLoading}
                disabled={isLoading}
                style={styles.registerButton}
              >
                Create Account
              </Button>

              <View style={styles.loginContainer}>
                <Text>Already have an account? </Text>
                <Button
                  mode="text"
                  onPress={() => navigation.navigate('Login')}
                  compact
                >
                  Sign In
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666666',
  },
  form: {
    marginTop: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
  },
  roleContainer: {
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioText: {
    marginLeft: 8,
    flex: 1,
  },
  registerButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default RegisterScreen;