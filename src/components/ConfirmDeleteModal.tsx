import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface ConfirmDeleteModalProps {
  isVisible: boolean;
  patioIdentificacao: string | null;
  onConfirm: (identificacao: string) => void;
  onCancel: () => void;
  loading: boolean;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isVisible,
  patioIdentificacao,
  onConfirm,
  onCancel,
  loading
}) => {
  if (!patioIdentificacao) return null;

  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Confirmar Exclusão</Text>
        <Text style={styles.message}>
          Tem certeza que deseja excluir o pátio "{patioIdentificacao}"?
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel} disabled={loading}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={() => onConfirm(patioIdentificacao)}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Excluir</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  message: {
    fontSize: 16,
    marginBottom: 20
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5
  },
  cancelButton: { backgroundColor: '#ccc' },
  confirmButton: { backgroundColor: '#ff6b6b' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
