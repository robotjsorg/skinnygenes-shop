import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Group, Paper, Stepper, TextInput, Select, Grid, Card } from '@mantine/core';
import { useCart } from '../contexts/CartContext';
import './CheckoutPage.css';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
    country: 'USA',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const nextStep = () => setActiveStep((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    console.log('Placing order with:', { shippingDetails, paymentDetails, cart });
    alert('Order Placed Successfully! (This is a mock order)');
    clearCart();
    navigate('/order-confirmation');
  };

  if (cart.length === 0) {
    return (
      <Container size="lg" py="xl" className="checkout-page">
        <Paper shadow="sm" p="xl" withBorder>
          <Title order={1} ta="center" mb="xl">Checkout</Title>
          <Text ta="center" size="lg">Your cart is empty. Please add items to your cart to proceed to checkout.</Text>
          <Group justify="center" mt="md">
            <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
          </Group>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl" className="checkout-page">
      <Title order={1} ta="center" mb="xl">Checkout</Title>

      <Stepper active={activeStep} onStepClick={setActiveStep} allowNextStepsSelect={false}>
        <Stepper.Step label="Shipping Address" description="Enter your delivery details">
          <Paper shadow="sm" p="xl" withBorder>
            <TextInput
              label="Full Name"
              placeholder="John Doe"
              name="fullName"
              value={shippingDetails.fullName}
              onChange={handleShippingChange}
              required
            />
            <TextInput
              label="Address"
              placeholder="123 Main St"
              name="address"
              value={shippingDetails.address}
              onChange={handleShippingChange}
              mt="md"
              required
            />
            <Grid mt="md">
              <Grid.Col span={6}>
                <TextInput
                  label="City"
                  placeholder="Anytown"
                  name="city"
                  value={shippingDetails.city}
                  onChange={handleShippingChange}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="ZIP Code"
                  placeholder="12345"
                  name="zip"
                  value={shippingDetails.zip}
                  onChange={handleShippingChange}
                  required
                />
              </Grid.Col>
            </Grid>
            <Select
              label="Country"
              placeholder="Select your country"
              data={['USA', 'Canada', 'Mexico']}
              name="country"
              value={shippingDetails.country}
              onChange={(value) => setShippingDetails((prev) => ({ ...prev, country: value || '' }))}
              mt="md"
              required
            />
            <Group justify="flex-end" mt="xl">
              <Button onClick={nextStep}>Next step</Button>
            </Group>
          </Paper>
        </Stepper.Step>

        <Stepper.Step label="Payment Details" description="Enter your payment information">
          <Paper shadow="sm" p="xl" withBorder>
            <TextInput
              label="Card Number"
              placeholder="XXXX XXXX XXXX XXXX"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentChange}
              required
            />
            <Grid mt="md">
              <Grid.Col span={6}>
                <TextInput
                  label="Expiry Date"
                  placeholder="MM/YY"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handlePaymentChange}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="CVC"
                  placeholder="XXX"
                  name="cvc"
                  value={paymentDetails.cvc}
                  onChange={handlePaymentChange}
                  required
                />
              </Grid.Col>
            </Grid>
            <Group justify="space-between" mt="xl">
              <Button variant="default" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep}>Next step</Button>
            </Group>
          </Paper>
        </Stepper.Step>

        <Stepper.Step label="Order Summary" description="Review your order">
          <Paper shadow="sm" p="xl" withBorder>
            <Title order={3} mb="md">Items in Cart</Title>
            {cart.map((item) => (
              <Card key={item.product.id} shadow="xs" p="xs" mb="sm" withBorder>
                <Group justify="space-between">
                  <Text>{item.product.name} x {item.quantity}</Text>
                  <Text>${(item.product.price * item.quantity).toFixed(2)}</Text>
                </Group>
              </Card>
            ))}

            <Group justify="space-between" mt="md">
              <Text fw={700} size="lg">Total:</Text>
              <Text fw={700} size="lg">${totalAmount.toFixed(2)}</Text>
            </Group>

            <Title order={3} mt="xl" mb="md">Shipping Details</Title>
            <Text><strong>Name:</strong> {shippingDetails.fullName}</Text>
            <Text><strong>Address:</strong> {shippingDetails.address}, {shippingDetails.city}, {shippingDetails.zip}, {shippingDetails.country}</Text>

            <Title order={3} mt="xl" mb="md">Payment Details</Title>
            <Text><strong>Card Number:</strong> **** **** **** {paymentDetails.cardNumber.slice(-4)}</Text>
            <Text><strong>Expiry:</strong> {paymentDetails.expiryDate}</Text>

            <Group justify="space-between" mt="xl">
              <Button variant="default" onClick={prevStep}>Back</Button>
              <Button onClick={handlePlaceOrder}>Place Order</Button>
            </Group>
          </Paper>
        </Stepper.Step>

        <Stepper.Completed>
          <Container ta="center">
            <Title order={2}>Thank you for your order!</Title>
            <Text mt="md">Your mock order has been placed successfully.</Text>
            <Button mt="xl" onClick={() => navigate('/')}>Back to Home</Button>
          </Container>
        </Stepper.Completed>
      </Stepper>
    </Container>
  );
};

export default CheckoutPage;
